// Mock agents for the 25 inside sales reps at Venture Home Solar.
// Shape mirrors the planning.md Agent model so the live data layer can swap in identically.
// Team assignment by state (confirmed): Ben covers MA/NH/ME/RI/CT, Joseph covers NY/MD/PA/NJ.

export const agents = [
  // Ben's team — New England states (MA/NH/ME/RI/CT)
  { id: 'agent-001', name: 'Mike Chen',        team: 'Ben',    states: ['MA'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-002', name: 'Tom Wilson',       team: 'Ben',    states: ['NH'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-003', name: 'Alex Rodriguez',   team: 'Ben',    states: ['MA', 'RI'], coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-004', name: 'James Brown',      team: 'Ben',    states: ['CT'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-005', name: 'Daniel Park',      team: 'Ben',    states: ['MA'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-006', name: 'Ryan Thompson',    team: 'Ben',    states: ['ME'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-007', name: 'Brandon Kim',      team: 'Ben',    states: ['NH', 'ME'], coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-008', name: 'Chris Patel',      team: 'Ben',    states: ['MA'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-009', name: 'Jordan Murphy',    team: 'Ben',    states: ['RI'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-010', name: 'Marcus Williams',  team: 'Ben',    states: ['CT'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-011', name: 'Tyler Anderson',   team: 'Ben',    states: ['MA'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-012', name: 'Kevin O\'Brien',   team: 'Ben',    states: ['NH'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-013', name: 'Ethan Carter',     team: 'Ben',    states: ['CT', 'MA'], coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },

  // Joseph's team — Mid-Atlantic states (NY/MD/PA/NJ)
  { id: 'agent-014', name: 'Sarah Johnson',    team: 'Joseph', states: ['NY'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-015', name: 'Emma Davis',       team: 'Joseph', states: ['NJ'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-016', name: 'Katie Miller',     team: 'Joseph', states: ['MD'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-017', name: 'Lisa Garcia',      team: 'Joseph', states: ['PA'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-018', name: 'Jessica Lee',      team: 'Joseph', states: ['NY', 'NJ'], coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-019', name: 'Olivia Martinez',  team: 'Joseph', states: ['MD'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-020', name: 'Amanda White',     team: 'Joseph', states: ['PA'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-021', name: 'Megan Foster',     team: 'Joseph', states: ['NY'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-022', name: 'Rachel Cohen',     team: 'Joseph', states: ['NJ'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-023', name: 'Sophia Nguyen',    team: 'Joseph', states: ['PA', 'MD'], coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-024', name: 'Ashley Robinson',  team: 'Joseph', states: ['NY'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
  { id: 'agent-025', name: 'Natalie Singh',    team: 'Joseph', states: ['NJ'],       coadvantage_id: null, salesforce_user_id: null, five9_agent_id: null, is_active: true },
];

export const getAgentById = (id) => agents.find((a) => a.id === id);
export const getAgentByName = (name) => agents.find((a) => a.name === name);
