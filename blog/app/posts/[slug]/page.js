import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
//const e = require("../../../posts")

const getPostMetadata = () => {
  const folder = "../../../";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));
  const slugs = markdownPosts.map((file) => file.replace(".md", ""));

  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`${folder}/${fileName}`, "utf-8");
    const matterResult = matter(fileContents);

    return {
      title: matterResult.data.title,
      subtitle: matterResult.data.subtitle,
      slug: fileName.replace(".md", ""),
    };
  });

  return posts;
};

const getPostContent = (slug) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const PostPage = (props) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  return (
    <div className="">
      <p className="text-3xl text-center">{post.data.title}</p>

      <br />
      <p className="text-xl text-center">{post.data.subtitle}</p>

      <br />

      <article className="flex prose justify-center">
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  );
};

export default PostPage;
