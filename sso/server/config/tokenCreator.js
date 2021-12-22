exports.makeToken = (length)=>{
    var result           = [];
    var characters       = '0123456789qwertyuopilkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
        charactersLength)));
    }
    return result.join('');
}