export default interface Shop { 
    name : string ,
    id : number ,
    category : string  | null,
    latitude : number ,
    longitude : number ,
    photo_url : string | null ,
    created_at : Date
}
