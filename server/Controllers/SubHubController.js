module.exports={
    getSub(req,res){
        let db=req.app.get('db');
        db.subhubs.get_sub(req.params.subhub_id).then(sub => {
            return res.status(200).json(sub);
        })
    },
    getSubByName(req,res){
        let db=req.app.get('db');
        console.log('hit controller');
        const {name} = req.query        
        db.subhubs.get_sub_by_name(name).then(sub=>{
            return res.status(200).json(sub)
        })
    },
    newSub(req,res){
        const {sh_name, sh_desc, sh_icon, sh_banner, theme_color} = req.body;
        let db=req.app.get('db');
        db.subhubs.new_sub([sh_name, sh_desc, sh_icon, sh_banner, theme_color]).then(sub => {
            return res.status(200).json(sub);
        })
    },
    editSub(req,res){
        const {subhub_id} = req.params;
        const {sh_name, sh_desc, sh_icon, sh_banner, theme_color} = req.body;
        let db=req.app.get('db');
        db.subhubs.edit_sub([subhub_id, sh_name, sh_desc, sh_icon, sh_banner, theme_color]).then(sub => {
            return res.status(200).json(sub);
        })
    },
    deleteSub(req,res){
        let db=req.app.get('db');
        db.subhubs.delete_sub(req.params.subhub_id)    
    }
}