import './App.css';
import React, { useEffect, useState } from 'react';
import fetchData from './services/api';
import { IssueItem } from './types';
import FilterArea from './components/FilterArea';
import ListArea from './components/ListArea';

const App: React.FC = () => {
  const [issues, setIssues] = useState<IssueItem[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<IssueItem[]>([]);
  const [loading , setLoading] = useState<boolean | null>(true);

  useEffect(() => {
    const loadIssues = async () => {
      setLoading(true);
      try {
        const data = await fetchData();
        setIssues(data);
        setFilteredIssues(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading issues:', error);
        setLoading(false);
      }
    };

    loadIssues();
  }, []);

  const handleFilterChange = (newFilteredIssues: IssueItem[]) => {
    setFilteredIssues(newFilteredIssues);
  };

  function getUniqueTeamNames(data: IssueItem[]): string[] {
    const uniqueTeams = new Set<string>();
    data.forEach(item => {
        uniqueTeams.add(item.team);
    });
    return Array.from(uniqueTeams);
  }

  function getUniqueTag(data: IssueItem[]): string[] {
    const tagsSet = new Set<string>();
    data.forEach(item => {
      item.tag.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }

  const team = getUniqueTeamNames(issues);
  const tag = getUniqueTag(issues);

  return (
    <div className='bg-[#242525] p-4 px-16 min-h-screen'>
      {loading ? <p className='text-white text-xl '>Loading....</p> : (
        <>
          <FilterArea issues={issues} onFilterChange={handleFilterChange} teamList={team} tagList={tag} />
          <ListArea issues={filteredIssues} />
        </>
      )}
    </div>
  );
};

export default App;
