
import React, {  useState } from 'react';
import { IssueItem } from '../types';



interface FilterAreaProps {
  issues: IssueItem[];
  onFilterChange: (filteredIssues: IssueItem[]) => void;
  teamList: string[];
tagList: string[];
}

const FilterArea: React.FC<FilterAreaProps> = ({ issues, onFilterChange , teamList, tagList }) => {
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [team, setTeam] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  // const [issue , setIssue] = useState<IssueItem[]>([]);

  // useEffect(() => {
  //   const loadIssues = async () => {
  //     try {
  //       const data = await fetchData();
  //       setIssue(data);
  //     } catch (error) {
  //       console.error('Error loading issues:', error);
  //     }
  //   };

  //   loadIssues();
  // }, []);

  const handleFilterChange = () => {
    let filteredIssues = issues;

    if (category) {
      filteredIssues = filteredIssues.filter(issue => issue.category === category);
    }

    if (priority) {
      filteredIssues = filteredIssues.filter(issue => issue.priority === priority);
    }

    if (team) {
      filteredIssues = filteredIssues.filter(issue => issue.team === team);
    }

    if (tag) {
      filteredIssues = filteredIssues.filter(issue => issue.tag.includes(tag));
    }

    onFilterChange(filteredIssues);
  };

  const resetFilters = () => {
    setCategory(null);
    setPriority(null);
    setTeam(null);
    setTag(null);
    onFilterChange(issues);
  };

  return (
    <div className='border border-[#5D6160] min-h-32 rounded-xl p-4  mb-8'>
    <div className='grid grid-cols-4 bg-[#242525] mb-4 gap-4'>
      <label >
        <h2 className='text-white'>Filter By Category</h2>
      <select 
      className='bg-[#2E2F2F] text-neutral-500 p-2 w-full rounded border border-[#5D6160] '
      // focus:outline-none focus:ring-1 focus:ring-[#49A3EA]
      value={category || ''} onChange={(e) => { setCategory(e.target.value); handleFilterChange(); }}>
        <option value="">Category</option>
        <option value="Bug">Bug</option>
        <option value="Feature">Feature</option>
        <option value="Enhancement">Enhancement</option>
        <option value="Question">Question</option>
      </select>
      </label>
    
      <label >
        <h2 className='text-white'>Filter By Priority</h2>
      <select 
     className='bg-[#2E2F2F] text-neutral-500 p-2 w-full rounded border border-[#5D6160] '
      value={priority || ''} onChange={(e) => { setPriority(e.target.value); handleFilterChange(); }}>
        <option value="">Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>
      </label>

      <label >
        <h2 className='text-white'>Filter By Team</h2>
      <select 
     className='bg-[#2E2F2F] text-neutral-500 p-2 w-full rounded border border-[#5D6160] '
      value={team || ''} onChange={(e) => { setTeam(e.target.value); handleFilterChange(); }}>
        <option value="">Team</option>
        {teamList.map((team)=>(
        <option key={team} value={team}>{team}</option>
      ))}
      </select>
      </label>

      <label >
        <h2 className='text-white'>Filter By Tag</h2>
      <select 
     className='bg-[#2E2F2F] text-neutral-500 p-2 w-full rounded border border-[#5D6160] '
      value={tag || ''} onChange={(e) => { setTag(e.target.value); handleFilterChange(); }}>
         {tagList.map((tag)=>(
        <option key={tag} value={tag}>{tag}</option>
      ))}
      </select>
      </label>
      
     
    </div>
    <div className='flex justify-between items-center border-t border-[#5D6160] p-4 '>
    <div>

    </div>
  <button  className='border border-[#49A3EA] rounded p-2 text-[#49A3EA]'
  onClick={resetFilters} disabled={!category && !priority && !team && !tag}>Reset Filters</button>
  </div>
  </div>
  );
};

export default FilterArea;
