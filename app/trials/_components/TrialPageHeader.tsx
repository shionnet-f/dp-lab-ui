type PurchaseConditions = {
    budgetYen: number;
    quantityCondition: string;
    specificCondition: string;
};

type HeaderProps = {
    purchaseConditions: PurchaseConditions;
    title: string
};

export function TrialPageHeader({ purchaseConditions, title }: HeaderProps) {
    return (
        <>
            <div className="h-[60px]" />

            <div className="mx-auto flex h-[45px] w-[1160px] items-center border border-blue-200 bg-blue-50 px-[24px] text-[16px] text-blue-800">
                <span className="font-semibold">購入条件：</span>
                予算{purchaseConditions.budgetYen}円以内、
                {purchaseConditions.quantityCondition}、
                {purchaseConditions.specificCondition}
            </div>

            <header className="mx-auto flex h-[60px] w-[1160px] items-center">
                <h1 className="text-[24px] font-bold text-gray-900">{title}</h1>
            </header>
        </>
    );
}