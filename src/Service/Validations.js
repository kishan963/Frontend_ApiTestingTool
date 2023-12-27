
const checkValidJson = (text) => {
    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            return true;
    }else{
        return false;
    }
}



export const checkParams = (formData, jsonText, headerData ,expectedResponse) => {

    

    if(!formData.url) {
        alert('Request URL is empty!');
        return false;
    }

    if(!checkValidJson(jsonText)) {
        alert('Text is not valid json');
        return false;
    }

    // if(!checkValidJson(expectedResponse)) {
    //     alert('Text is not valid json');
    //     return false;
    // }

    return true;
}

export const getHeadersAndParams = (objArr) => {
    let obj = {};
    objArr.forEach(data => {
        if (data.hasOwnProperty('check') && data.check) {
            obj = { ...obj, [data.key]: data.value };
        }
    })
    return obj;
}