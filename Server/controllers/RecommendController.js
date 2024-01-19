const { Product } = require("../models/Product")

const similarityCalculator = (item1, item2) => {
    const commonFeatures=item1.keywords.filter(keyword=> item2.keywords.includes(keyword))
    return commonFeatures.length/Math.sqrt(item1.keywords.length * item2.keywords.length)
}
const recommendor = async(itemId)=>{
    const currentItem = await Product.findById(itemId);
    const items = await Product.find({});
    if (!currentItem) {
        res.status(401).json({ success: false,message:"No Product Found For Recommendation"})
        return [];
    }
    const similarityScore = items.map((item) => ({
        item: item,
        similarity: similarityCalculator(currentItem, item)
    }));
    // Sort the generated scores
    const sortedScores=similarityScore.sort((a,b)=> b.similarity - a.similarity)

    console.log(sortedScores)
    // Remove Current item out from the recommendation List
    const filteredList=sortedScores.filter((item)=> item.item.id!== itemId)
    return filteredList;
}
exports.recommendController = async (req, res) => {
    try {
        const { id } = req.params; 
        const recommendation =await recommendor(id);
        res.status(200).json({success:true,message:"Recommendation List Generated",recommendation})
    } catch (error) {
        console.log(error)
        res.send(error)
        res.status(401).json({success:false,message:"Unexpected Error Occured When Recommending Items"})
    }
}