import axios from "axios"
import { useEffect, useState } from "react"

const useHttp = (req) =>{
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [err, setErr] = useState(false)
    const cancelToken = axios.CancelToken.source()

    useEffect(() => {
        setIsLoading(true)
        const getData = async () => {
            try{
                const res = await axios({
                    method: 'get',
                    url: `http://localhost:3000/api/${req.url}`,
                    cancelToken: cancelToken.token,
                    withCredentials: true
                })
                setData(res.data)
            }
            catch(error){
                setErr(error.response.data)
            }
        }
        getData()
        setIsLoading(false)
        
        return () => cancelToken.cancel()
    }, [])

    return {
        data,
        isLoading,
        err,
        setData
    }
}

export default useHttp