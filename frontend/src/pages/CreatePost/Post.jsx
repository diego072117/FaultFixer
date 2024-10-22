import { FormPost } from "../../components/FormPost/FormPost";
import "./Module.scss";

export const Post = () => {
  return (
    <div className="container-create">
      <div className="create">
        <div className="title-create">
          <h2>Create Post</h2>
        </div>
        <FormPost action="Create"/>
      </div>
    </div>
  );
};
