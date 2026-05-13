import fs from "fs";
import path from "path";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

function jsonStringifySafe(value: unknown): string {
  return JSON.stringify(value, (_key, currentValue) => {
    if (typeof currentValue === "bigint") {
      return currentValue.toString();
    }

    return currentValue;
  });
}

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  let text: string;

  if (value instanceof Date) {
    text = value.toISOString();
  } else if (typeof value === "bigint") {
    text = value.toString();
  } else if (typeof value === "object") {
    text = jsonStringifySafe(value);
  } else {
    text = String(value);
  }

  const escaped = text.replace(/"/g, '""');

  if (/[",\n\r]/.test(escaped)) {
    return `"${escaped}"`;
  }

  return escaped;
}

function toCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns: string[],
): string {
  const header = columns.join(",");

  const body = rows
    .map((row) =>
      columns.map((column) => escapeCsvValue(row[column])).join(","),
    )
    .join("\n");

  return `${header}\n${body}`;
}

async function exportEventLogs(exportDir: string) {
  const eventLogs = await prisma.eventLog.findMany({
    orderBy: [
      {
        createdAt: "asc",
      },
      {
        id: "asc",
      },
    ],
  });

  const columns = [
    "id",
    "createdAt",
    "sessionId",
    "participantId",
    "phase",
    "setIndex",
    "taskSetId",
    "trialNo",
    "page",
    "type",
    "ts",
    "meta",
    "payload",
  ];

  const csv = toCsv(eventLogs, columns);

  fs.writeFileSync(
    path.join(exportDir, "event_logs_raw.csv"),
    "\uFEFF" + csv,
    "utf-8",
  );

  console.log(`event_logs_raw.csv: ${eventLogs.length} rows`);
}

async function main() {
  const exportDir = path.join(process.cwd(), "exported_csv");

  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  await exportEventLogs(exportDir);

  console.log("CSV export completed.");
  console.log(`Output directory: ${exportDir}`);
}

main()
  .catch((error) => {
    console.error("CSV export failed.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
