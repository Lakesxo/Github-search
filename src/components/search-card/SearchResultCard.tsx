import { SearchResponse, SearchType } from "../../App";
import {
  LinkIcon,
  OrganizationIcon,
  UserIcon,
  UserIdIcon,
} from "../../assets/icons";
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
        <a href={data.html_url} target="_blank" data-testid="profile-link">
          <Button
            name="Profile"
            variant="secondary"
            suffixIcon={<LinkIcon data-testid="link-icon" />}
          />
        </a>
      </section>
      <p className="name">{data.login}</p>
      <div className="flex">
        <div className="attributeWrapper">
          <span>
            <UserIdIcon data-testid="userid-icon" />
          </span>
          <span>{data.id}</span>
        </div>
        <div className="userType">
          <span>
            {data.type.toLowerCase() === SearchType.Users ? (
              <UserIcon />
            ) : (
              <OrganizationIcon />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
