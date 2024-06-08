
import React, { useState, useEffect, useCallback } from "react";
import { IssueItem } from "../types";
import { LayoutGrid, Tag, Box, DatabaseZap } from "lucide-react";

// {"id":"hhtej5io75400",
//   "title":"Et dolore magna aliqua. Ut enim ad minim veniam,",
//   "userName":"Exercitation",
//   "userAvatar":"https://robohash.org/hhte.png?set=set5&size=16x16",
//   "status":"To Do",
//   "category":"Bug",
//   "priority":"Medium",
//   "team":"Genmy",
//   "tag":["gtbf"],
//   "timestamp":1687836941367}

interface ListAreaProps {
  issues: IssueItem[];
}

const ListArea: React.FC<ListAreaProps> = ({ issues }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayedIssues, setDisplayedIssues] = useState<IssueItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Memoize the filtered issues to avoid re-calculating on every render
  const filteredIssues = useCallback(() => {
    return issues.filter((issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [issues, searchTerm]);

  // Initial load and search filter effect
  useEffect(() => {
    setDisplayedIssues(filteredIssues().slice(0, 20));
  }, [filteredIssues]);

  

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom && !loading) {
      loadMoreIssues();
    }
  };

  const loadMoreIssues = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayedIssues((prev) => [
        ...prev,
        ...filteredIssues().slice(prev.length, prev.length + 20),
      ]);
      setLoading(false);
    }, 500);
  };

  const renderIssues = (status: string) => {
    return displayedIssues
      .filter((issue) => issue.status === status)
      .map((issue) => (
        <div
          key={issue.id}
          className=" text-neutral-300 p-2 w-full rounded border border-[#5D6160] my-4 "
        >
          <div className="flex text-sm gap-2 font-bold p-2 border-b-[1px] border-[#5D6160]">
            <h3>{issue.title}</h3>
          </div>

          <div className="flex gap-2 p-2 border-b-[1px] border-[#5D6160]">
            <img src={issue?.userAvatar} alt={issue.userName} className="bg-[#49A3EA] h-6 cover w-6 rounded-full" />
            <p className="border-l-[1px] px-2 border-[#5D6160]">
              {issue.userName}
            </p>
          </div>

          <div className="flex gap-2 p-2 border-b-[1px] border-[#5D6160]">
            <LayoutGrid />
            <p
              className="border-l-[1px] px-2 border-[#5D6160]

"
            >
              {issue.category}
            </p>
          </div>

          <div className="flex gap-2 p-2 border-b-[1px] border-[#5D6160]">
            <Box />
            <p className="border-l-[1px] px-2 border-[#5D6160]">
              {issue.priority}
            </p>
          </div>
          <div className="flex gap-2 p-2 border-b-[1px] border-[#5D6160]">
            <DatabaseZap />
            <p className="border-l-[1px] px-2 border-[#5D6160]">{issue.team}</p>
          </div>
          <div className="flex gap-2 p-2  border-[#5D6160]">
            <Tag />
            <p className="border-l-[1px] px-2 border-[#5D6160]">
              {issue.tag.join(", ")}
            </p>
          </div>
        </div>
      ));
  };

  return (
    <div>
      <div
        onScroll={handleScroll}
        style={{ height: "70vh", overflowY: "scroll" }}
      >
        <div className="grid grid-cols-4 gap-8 ">
          <div className="border border-[#5D6160] rounded p-4 ">
            <div className="flex justify-between items-center">
              <h2 className="text-neutral-100">To-Do</h2>
              <input
                className="bg-[#2E2F2F] text-sm text-neutral-500 p-2 rounded border border-[#5D6160] "
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {renderIssues("To Do")}
          </div>
          <div className="border border-[#5D6160] rounded p-4 ">
          <div className="flex justify-between items-center">
              <h2 className="text-neutral-100">In Progress</h2>
              <input
                className="bg-[#2E2F2F] text-sm text-neutral-500 p-2 rounded border border-[#5D6160] "
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {renderIssues("In Progress")}
          </div>
          <div className="border border-[#5D6160] rounded p-4 ">
          <div className="flex justify-between items-center">
              <h2 className="text-neutral-100">Review</h2>
              <input
                className="bg-[#2E2F2F] text-sm text-neutral-500 p-2 rounded border border-[#5D6160] "
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {renderIssues("Review")}
          </div>
          <div className="border border-[#5D6160] rounded p-4 ">
          <div className="flex justify-between items-center">
              <h2 className="text-neutral-100">Completed</h2>
              <input
                className="bg-[#2E2F2F] text-sm text-neutral-500 p-2 rounded border border-[#5D6160] "
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {renderIssues("Completed")}
          </div>
        </div>
      </div>
      {loading && <p className="text-white text-xl  font-bold ">Loading more issues...</p>}
    </div>
  );
};

export default ListArea;
