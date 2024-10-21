import { Link } from "react-router-dom";

function BranchCard({data}) {
  return (
    <div className="col-lg-3  col-md-4 col-6">
        <div className="bs-img">
            <Link to={`/branch/${data.name.replace(/\s+/g, '-').toLowerCase()}`}>{data.name}</Link>
        </div>
    </div>
  );
}

export default BranchCard;
