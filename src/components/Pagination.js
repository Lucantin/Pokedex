import React from "react";

const Pagination = (props) => {
    const {page, totalPages, onLeftClick, onRightClick} = props;
    return(
        <div className="pagination-container">
            <button onClick={onLeftClick} className="direct-btn"><div>◀</div></button>
            <div className="page-count">{page} de {totalPages}</div>
            <button onClick={onRightClick}className="direct-btn"><div>▶</div></button>
        </div>
    )
}

export default Pagination;