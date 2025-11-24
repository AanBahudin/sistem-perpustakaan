import { customFetch } from "@/utils/customFetch";

const getDendaAction = async() => {
    const {data: response} = await customFetch.get('/denda/withId')
    return response.data
}

export default getDendaAction