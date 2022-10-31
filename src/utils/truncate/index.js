export const truncate = (input, maxLength) =>
{
    return input.length > maxLength ? `${input.substring(0, maxLength)}...` : input
}