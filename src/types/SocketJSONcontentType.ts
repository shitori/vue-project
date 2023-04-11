import EnumCibleWS from "../interfaces/EnumCible"

type SocketJSONcontentType = {
    message: string
    percent: number
    cible: EnumCibleWS
}

export default SocketJSONcontentType
