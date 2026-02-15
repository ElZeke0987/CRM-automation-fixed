
export const copyFunctionAccessor = {
    val: true,
    set: (value: boolean) => copyFunctionAccessor.val = value
}
