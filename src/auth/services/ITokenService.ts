
export default ITokenService{

    encodeURI(payload: string | object): string | object
    decodeURI(token: string | object): string | object
}