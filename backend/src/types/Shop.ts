export default interface Shop { 
    name : string ,
    id : number ,
    category : string  | null,
    latitude : number ,
    longitude : number ,
    photo_url : string | null ,
    phone : string[],
    user_id : number,
    created_at : Date
}
