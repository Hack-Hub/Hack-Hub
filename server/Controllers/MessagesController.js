module.exports={
    getMessages(){
        let db=req.app.get('db');
        db.messages.get_messages(req.params.subhub_id).then(messages => {
            return res.status(200).json(messages);
        })
    },
    newMessage(){
        const {subhub_id, user_id, message_text} = req.body;
        let db = req.app.get('db');
        db.messages.new_message([subhub_id, user_id, message_text]).then(messages => {
            return res.status(200).json(messages);
        })        
    }
}