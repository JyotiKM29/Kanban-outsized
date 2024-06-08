
import React, { useState } from 'react';
import { IssueItem } from '../types';

interface IssueLaneProps {
    status: string;
    issues: IssueItem[];
}

const IssueLane: React.FC<IssueLaneProps> = ({ status, issues }) => {
    const [search, setSearch] = useState<string>('');

    const filteredIssues = issues.filter(issue => issue.title.includes(search));

    return (
        <div className="issue-lane">
            <h3>{status}</h3>
            <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className="issues">
                {filteredIssues.map(issue => (
                    <div key={issue.id} className="issue-item">
                        <h4>{issue.title}</h4>
                        <p>{issue.userName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IssueLane;
