import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default:
      "https://imgs.search.brave.com/DP0nqi7Z5D3kG0iWBeuAnTLLgnSurPqSL5Q7x6boK9A/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/YmxvZ3R5cmFudC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MTkvMDcvZHJhZnQt/YS1wb3N0LmpwZw",
  },
  category:{
    type: String,
    default: 'Uncategorized',
  },
  slug:{
    type: String,
    required: true,
    unique: true,
  },
   
}, { timestamps: true}
);

const Post = mongoose.model('Post', postSchema);

export default Post
