import { useState } from 'react';

function useAlert(message,status) {
    const [info,setInfo] = useState({
        msg:'',
        sts:''
    })

    setInfo({msg:message,sts:status})

    return info
}

export default useAlert