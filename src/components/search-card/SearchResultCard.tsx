import { SearchResponse } from "../../App";
import { LinkIcon, UserIdIcon } from "../../assets/icons";
import Button from "../button/Button";
import "./searchResultCard.css";

interface SearchResultCardProps {
  data: SearchResponse;
}

const SearchResultCard: React.FunctionComponent<SearchResultCardProps> = ({
  data,
}) => {
  return (
    <div className="resultCard">
      <section className="avatar">
        <img src={data.avatar_url} alt="avatar" />
        <a href={data.html_url} target="_blank">
          <Button
            name="Profile"
            variant="secondary"
            suffixIcon={<LinkIcon />}
          />
        </a>
      </section>
      <p className="name">{data.login}</p>
      <div className="attributeWrapper">
        <span>
          <UserIdIcon />
        </span>
        <span>{data.id}</span>
      </div>
    </div>
  );
};

export default SearchResultCard;
