const isNullInput = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        if (arr[i] == null || arr[i] == undefined || String(arr[i]).length == 0) return true
    }

    return false
}

const Validate = {
    isNullInput
}

export default Validate