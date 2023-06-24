//.forEach() to iterate over arrays
//generate uuid
//textarea, data attributes
//conditionally render styles
//not operator !

import {tweetsData} from './data.js'


const tweetBtn = document.getElementById("tweet-btn")
const tweetInput = document.getElementById("tweet-input")



tweetBtn.addEventListener('click', () => {
    console.log(tweetInput.value)
})

document.addEventListener('click', (e) => {
    if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
})

function handleLikeClick(tweetId) {
    console.log(tweetId)
}



function getFeedHtml() {
    let feedHtml = ''
    // for(let eachObject of tweetsData) {
    //      feedHtml += `
    //         <div class="tweet">
    //             <div class="tweet-inner">
    //                 <img src="${eachObject.profilePic}" class="profile-pic">
    //                 <div>
    //                     <p class="handle">${eachObject.handle}</p>
    //                     <p class="tweet-text">${eachObject.tweetText}</p>
    //                     <div class="tweet-details">
    //                         <span class="tweet-detail">
    //                             ${eachObject.replies.length} 
    //                         </span>
    //                         <span class="tweet-detail">
    //                             ${eachObject.likes}
    //                         </span>
    //                         <span class="tweet-detail">
    //                             ${eachObject.retweets}
    //                         </span>
    //                     </div>   
    //                 </div>            
    //             </div>
    //         </div>         
    //     `
    // }
    tweetsData.forEach((eachObject) => {
        feedHtml += `
             <div class="tweet">
                 <div class="tweet-inner">
                     <img src="${eachObject.profilePic}" class="profile-pic">
                     <div>
                         <p class="handle">${eachObject.handle}</p>
                         <p class="tweet-text">${eachObject.tweetText}</p>
                         <div class="tweet-details">
                             <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" data-reply="${eachObject.uuid}"></i>
                                 ${eachObject.replies.length} 
                             </span>
                             <span class="tweet-detail">
                                <i class="fa-solid fa-heart" data-like="${eachObject.uuid}"></i>
                                 ${eachObject.likes}
                             </span>
                             <span class="tweet-detail">
                                <i class="fa-solid fa-retweet" data-retweet="${eachObject.uuid}"></i>
                                 ${eachObject.retweets}
                             </span>
                         </div>   
                     </div>            
                 </div>
             </div>         
         `
    })
    console.log(feedHtml)
    return feedHtml
}
// getFeedHtml()
{/* <div class="tweet">
    <div class="tweet-inner">
        <img src="URL OF PROFILE PIC" class="profile-pic">
        <div>
            <p class="handle">TWEET HANDLE</p>
            <p class="tweet-text">TWEET TEXT</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    NUMBER OF REPLIES
                </span>
                <span class="tweet-detail">
                    NUMBER OF LIKES
                </span>
                <span class="tweet-detail">
                    NUMBER OF RETWEETS
                </span>
            </div>   
        </div>            
    </div>
</div> */}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}
render()