
export function getProductPath(
    setType: string,
    trialId: string
) {
    return `/trials/${setType}/${trialId}/product`;
}