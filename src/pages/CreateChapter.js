import React from 'react';
import background_img from '../assets/login_page.jpg';

export const CreateChapter = () => {
  return (
    <main>
      <div
        className="min-h-screen flex items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${background_img})` }}
      >
        <div className="bg-white shadow-md rounded px-12 pt-10 pb-12 mb-4 w-full max-w-4xl mt-12">
          <h2 className="text-3xl mb-8">Create Chapter for "Book Title"</h2> {/* Static text */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book Title
                </label>
                <p className="text-gray-700 py-3 px-4">
                  Book Title
                </p>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chapterTitle">
                  Chapter Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="chapterTitle"
                  type="text"
                  placeholder="Enter chapter title"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chapterSummary">
                  Chapter Summary
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="chapterSummary"
                  type="text"
                  placeholder="Enter chapter summary"
                />
              </div>
              <div className="grid grid-cols-2 gap-6"> {/* Added grid layout for side-by-side fields */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chapterText">
                    Chapter Text
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="chapterText"
                    rows="10"
                    placeholder="Write your chapter text here..."
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groupDetails">
                    Group Chat
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="groupDetails"
                    rows="10"
                    placeholder="Group Chat"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveDraft"
                className="mr-2 leading-tight"
              />
              <label className="text-gray-700 text-sm font-bold" htmlFor="saveDraft">
                Save Draft
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Create Chapter
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
