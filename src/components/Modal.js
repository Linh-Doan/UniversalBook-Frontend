import { useState } from 'react';
export const Modal = ({onClose, onAddComment, isLoading}) => {
    const [commentText, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [ratingMissing, setRatingMissing] = useState(false)
    const handleAdd = () => {
        if (rating === 0) {
            setRatingMissing(true)
        } else {
            setRatingMissing(false)
            onAddComment({
                "text": commentText,
                "rating": rating,
            })
        }
    }

    return (
        <div>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 "></div>
            <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">                
                        <div className="p-4 md:p-5 space-y-4">
                            <div className="flex justify-center">
                                { [...Array(5).keys()].map((value, index) => (
                                    value + 1 <= rating ? (
                                        <button key={index} className="text-lg bi bi-star-fill text-yellow-500 mr-1" onClick={() => setRating(index+1)}></button>
                                    ) : (
                                        <button key={index} className="text-lg bi bi-star text-yellow-500 mr-1" onClick={() => setRating(index+1)}></button>
                                    )
                                )) }
                            </div>
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your thoughts"
                                className="border border-gray-400 p-2 w-full rounded"
                            />
                            {ratingMissing && (
                                <div className="flex justify-center">
                                    <p className="text-base leading-relaxed text-red-500">
                                        Missing rating
                                    </p>
                                </div>
                            )}
                            
                            
                        </div>
                        <div className="flex justify-center items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                            <button 
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" 
                                onClick={handleAdd}
                                disabled={isLoading}
                            >
                                {isLoading? 'Adding...' : 'Add'}
                            </button>
                            <button 
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100" 
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
