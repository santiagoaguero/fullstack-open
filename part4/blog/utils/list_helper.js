const dummy = (blogs) =>{
    if (blogs.length === 0){
        return 1
    }
}


const totalLikes = (blogs) =>
     blogs.reduce(
        (accumulator, currentValue) => 
        accumulator + currentValue.likes, 0//start sum with 0
      )

const favoriteBlog = (blogs) => {
    const likes = blogs.map(x => x.likes)
    const maxLikes = Math.max(...likes)
    const indexMax = likes.indexOf(maxLikes)

    return blogs[indexMax]

}









module.exports = {dummy,totalLikes, favoriteBlog}
