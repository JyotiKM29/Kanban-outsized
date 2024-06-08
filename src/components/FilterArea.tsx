// src/components/FilterArea.tsx

import React, { useState, useEffect } from 'react';
import { IssueItem } from '../types';
import { X } from 'lucide-react';

interface FilterAreaProps {
  issues: IssueItem[];
  onFilterChange: (filteredIssues: IssueItem[]) => void;
  teamList: string[];
  tagList: string[];
}

const FilterArea: React.FC<FilterAreaProps> = ({ issues, onFilterChange, teamList, tagList }) => {
  const [category, setCategory] = useState<string[]>([]);
  const [priority, setPriority] = useState<string[]>([]);
  const [team, setTeam] = useState<string[]>([]);
  const [tag, setTag] = useState<string[]>([]);

  useEffect(() => {
    handleFilterChange();
  }, [category, priority, team, tag]);

  const handleFilterChange = () => {
    let filteredIssues = issues;

    if (category.length > 0) {
      filteredIssues = filteredIssues.filter(issue => category.includes(issue.category));
    }

    if (priority.length > 0) {
      filteredIssues = filteredIssues.filter(issue => priority.includes(issue.priority));
    }

    if (team.length > 0) {
      filteredIssues = filteredIssues.filter(issue => team.includes(issue.team));
    }

    if (tag.length > 0) {
      filteredIssues = filteredIssues.filter(issue => tag.some(t => issue.tag.includes(t)));
    }

    onFilterChange(filteredIssues);
  };

  const handleMultiSelect = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const resetFilters = () => {
    setCategory([]);
    setPriority([]);
    setTeam([]);
    setTag([]);
    onFilterChange(issues);
  };


  const handleRemoveFilter = (filterType: string, value: string) => {
    switch (filterType) {
      case 'category':
        setCategory(prev => prev.filter(item => item !== value));
        break;
      case 'priority':
        setPriority(prev => prev.filter(item => item !== value));
        break;
      case 'team':
        setTeam(prev => prev.filter(item => item !== value));
        break;
      case 'tag':
        setTag(prev => prev.filter(item => item !== value));
        break;
      default:
        break;
    }
  };

  return (
    <div className='border border-[#5D6160] min-h-32 rounded-xl p-4 mb-8'>
      <div className='grid grid-cols-4 bg-[#242525] mb-4 gap-4'>
        <label>
          <h2 className='text-white'>Filter By Category</h2>
          <select
            className='bg-[#2E2F2F] text-neutral-500 p-2 w-full rounded border border-[#5D6160]'
            value=""
            onChange={(e) => handleMultiSelect(setCategory, e.target.value)}
            
          >
            <option value="" disabled>Category</option>
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
            <option value="Enhancement">Enhancement</option>
            <option value="Question">Question</option>
          </select>
        </label>

        <label>
          <h2 className='text-white'>Filter By Priority</h2>
          <select
            className='bg-[#2E2F2F] text-neutral-500 p-2 w-full rounded border border-[#5D6160]'
            value=""
            onChange={(e) => handleMultiSelect(setPriority, e.target.value)}
           
          >
            <option value="" disabled>Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </label>

        <label>
          <h2 className='text-white'>Filter By Team</h2>
          <select
            className='bg-[#2E2F2F] text-neutral-500 p-2 w-full rounded border border-[#5D6160]'
            value=""
            onChange={(e) => handleMultiSelect(setTeam, e.target.value)}
            
          >
            <option value="" disabled>Team</option>
            {teamList.map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </label>

        <label>
          <h2 className='text-white'>Filter By Tag</h2>
          <select
            className='bg-[#2E2F2F] text-neutral-500 p-2 w-full rounded border border-[#5D6160]'
            value=""
            onChange={(e) => handleMultiSelect(setTag, e.target.value)}
            
          >
            <option value="" disabled>Tag</option>
            {tagList.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </label>
      </div>

      <div className='grid grid-cols-9 border-t border-[#5D6160] p-4'>
        <div className='col-span-8 flex gap-2 '>
          {category.length > 0 && category.map((item)=>(
            <span style={{ backgroundColor: 'rgba(8 ,145, 178 , 0.1)' }} className='text-cyan-600 mx-2 flex gap-2  py-2 px-4 rounded-full'> <X onClick={() => handleRemoveFilter('category', item)} /> {item}</span>
          ))}
          {priority.length > 0 && priority.map((item)=>(
          <span style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)' }} className='text-purple-600/100 mx-2 flex gap-2  bg-purple-700  py-2 px-4 rounded-full'> <X onClick={() => handleRemoveFilter('priority', item)} />{item}</span>
          ))}
          {team.length > 0 && team.map((item)=>(
            <span style={{ backgroundColor: 'rgba(234 ,88 ,12 , 0.1)' }} className='text-orange-600/100  mx-2flex gap-2  bg-orange-700  py-2 px-4 rounded-full'> <X onClick={() => handleRemoveFilter('team', item)} />{item}</span>
          ))}
       
          {tag.length > 0 && tag.map((item)=>(
            <span style={{ backgroundColor: 'rgba(0, 128, 0, 0.1)' }} className='text-green-600 flex mx-2 gap-2  bg-green-700  py-2 px-4 rounded-full'> <X onClick={() => handleRemoveFilter('tag', item)} />{item}</span>
          ))}
       
        
        </div>
        <button
          className='border border-[#49A3EA] rounded p-2 text-[#49A3EA] self-end'
          onClick={resetFilters}
          disabled={category.length === 0 && priority.length === 0 && team.length === 0 && tag.length === 0}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterArea;
