import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";

const getPostContent = (slug) => {
  const folder = "../../posts";
  const file = `${folder}/${slug}.md`;
  const content = fs.readFileSync(file, "utf-8");
  const matterResult = matter(content);
  return matterResult;
};

const PostPage = (props) => {
  const slug = props.params.slug;
  const content = getPostContent(slug);

  return (
    <div>
      <h1 className="text-5xl underline font-bold">{content.data.title}</h1>
      <br />
      <article className="prose lg:prose-xl">
        <Markdown>{content.content}</Markdown>
      </article>
    </div>
  );
};

export default PostPage;
