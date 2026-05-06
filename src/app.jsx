import { Bell, Settings, AlertTriangle, CheckCircle, Clock, TrendingUp, Users, DollarSign, Calendar, ChevronRight } from "lucide-react";

import { useState } from 'react';

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedTab, setSelectedTab] = useState('weekly');
  const [showContestConfig, setShowContestConfig] = useState(false);

  const T = {
    bg: "#0A0D10",
    surface: "#11151A", 
    border: "#1E2530",
    accent: "#F0A830",
    green: "#2DD4A8",
    red: "#F87171",
    text: "#E8EDF3",
    muted: "#8B95A3",
    dim: "#4A5568",
  };

  
  // Mock data for 25 agents
  const weeklyData = [
    { name: 'Mike Chen', team: 'Ben', logged: 40.0, verified: 38.5, status: 'flagged', issue: '45min gap unusual', callsPerHour: 18.2 },
    { name: 'Sarah Johnson', team: 'Joseph', logged: 32.0, verified: 32.0, status: 'clean', issue: null, callsPerHour: 22.1 },
    { name: 'Tom Wilson', team: 'Ben', logged: 40.0, verified: 35.0, status: 'flagged', issue: 'No calls logged 2-4pm', callsPerHour: 16.8 },
    { name: 'Emma Davis', team: 'Joseph', logged: 36.0, verified: 36.0, status: 'clean', issue: null, callsPerHour: 24.3 },
    { name: 'Alex Rodriguez', team: 'Ben', logged: 40.0, verified: 40.0, status: 'clean', issue: null, callsPerHour: 21.7 },
    { name: 'Katie Miller', team: 'Joseph', logged: 38.0, verified: 37.0, status: 'flagged', issue: 'Only 12 calls/hour Friday', callsPerHour: 15.2 },
    { name: 'James Brown', team: 'Ben', logged: 40.0, verified: 40.0, status: 'clean', issue: null, callsPerHour: 23.1 },
    { name: 'Lisa Garcia', team: 'Joseph', logged: 35.0, verified: 35.0, status: 'clean', issue: null, callsPerHour: 20.8 },
  ];

  const monthlyCommissions = [
    { name: 'Sarah Johnson', appointments: 23, tier: 2, deals: 4, commission: 1260, contests: 120 },
    { name: 'James Brown', appointments: 31, tier: 2, deals: 6, commission: 1820, contests: 200 },
    { name: 'Emma Davis', appointments: 18, tier: 1, deals: 3, commission: 480, contests: 0 },
    { name: 'Alex Rodriguez', apartments: 42, tier: 3, deals: 7, commission: 3360, contests: 500 },
    { name: 'Lisa Garcia', appointments: 27, tier: 2, deals: 3, commission: 1140, contests: 200 },
    { name: 'Mike Chen', appointments: 15, tier: 1, deals: 2, commission: 350, contests: 0 },
  ];

  const flaggedCount = weeklyData.filter(agent => agent.status === 'flagged').length;
  const cleanCount = weeklyData.filter(agent => agent.status === 'clean').length;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: T.bg, 
      fontFamily: "'Outfit', sans-serif",
      color: T.text,
      padding: 20
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 30
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            fontSize: 28, 
            fontWeight: 600,
            color: T.text 
          }}>
            Payroll Agent
          </h1>
          <p style={{ 
            margin: '4px 0 0 0', 
            color: T.muted,
            fontSize: 16 
          }}>
            Automated payroll verification & commission tracking
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            onClick={() => setShowContestConfig(true)}
            style={{
              backgroundColor: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 6,
              padding: '8px 12px',
              color: T.text,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Settings size={16} />
            Contest Rules
          </button>
          <div style={{ 
            position: 'relative',
            backgroundColor: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 6,
            padding: 8,
            cursor: 'pointer'
          }}>
            <Bell size={20} color={T.accent} />
            <div style={{
              position: 'absolute',
              top: 2,
              right: 2,
              width: 8,
              height: 8,
              backgroundColor: T.red,
              borderRadius: '50%'
            }} />
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 20,
        marginBottom: 30
      }}>
        <div style={{
          backgroundColor: T.surface,
          borderRadius: 8,
          padding: 20,
          border: `1px solid ${T.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <AlertTriangle size={20} color={T.red} />
            <span style={{ fontSize: 16, fontWeight: 500 }}>Flagged for Review</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: T.red, fontFamily: "'JetBrains Mono', monospace" }}>
            {flaggedCount}
          </div>
          <div style={{ fontSize: 14, color: T.muted }}>agents need attention</div>
        </div>

        <div style={{
          backgroundColor: T.surface,
          borderRadius: 8,
          padding: 20,
          border: `1px solid ${T.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <CheckCircle size={20} color={T.green} />
            <span style={{ fontSize: 16, fontWeight: 500 }}>Clean Timesheets</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: T.green, fontFamily: "'JetBrains Mono', monospace" }}>
            {cleanCount}
          </div>
          <div style={{ fontSize: 14, color: T.muted }}>agents verified</div>
        </div>

        <div style={{
          backgroundColor: T.surface,
          borderRadius: 8,
          padding: 20,
          border: `1px solid ${T.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Clock size={20} color={T.accent} />
            <span style={{ fontSize: 16, fontWeight: 500 }}>Time Saved</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: T.accent, fontFamily: "'JetBrains Mono', monospace" }}>
            4.2h
          </div>
          <div style={{ fontSize: 14, color: T.muted }}>this week</div>
        </div>

        <div style={{
          backgroundColor: T.surface,
          borderRadius: 8,
          padding: 20,
          border: `1px solid ${T.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <DollarSign size={20} color={T.green} />
            <span style={{ fontSize: 16, fontWeight: 500 }}>Monthly Commissions</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: T.green, fontFamily: "'JetBrains Mono', monospace" }}>
            $8.4k
          </div>
          <div style={{ fontSize: 14, color: T.muted }}>calculated for Dec</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex',
        borderBottom: `1px solid ${T.border}`,
        marginBottom: 20
      }}>
        {[
          { id: 'weekly', label: 'Weekly Verification', icon: Clock },
          { id: 'monthly', label: 'Monthly Commissions', icon: DollarSign },
          { id: 'contests', label: 'Contest Tracking', icon: TrendingUp }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '12px 20px',
                color: selectedTab === tab.id ? T.accent : T.muted,
                fontSize: 16,
                fontWeight: 500,
                cursor: 'pointer',
                borderBottom: selectedTab === tab.id ? `2px solid ${T.accent}` : '2px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Weekly Verification Tab */}
      {selectedTab === 'weekly' && (
        <div style={{
          backgroundColor: T.surface,
          borderRadius: 8,
          border: `1px solid ${T.border}`,
          overflow: 'hidden'
        }}>
          <div style={{ padding: 20, borderBottom: `1px solid ${T.border}` }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
              Week of Dec 10-16, 2023
            </h3>
            <p style={{ margin: '4px 0 0 0', color: T.muted, fontSize: 14 }}>
              Cross-referenced with Five9 call logs
            </p>
          </div>

          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: T.bg }}>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: 14, fontWeight: 600, color: T.muted }}>Agent</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: 14, fontWeight: 600, color: T.muted }}>Team</th>
                  <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 14, fontWeight: 600, color: T.muted }}>Logged Hours</th>
                  <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 14, fontWeight: 600, color: T.muted }}>Verified Hours</th>
                  <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 14, fontWeight: 600, color: T.muted }}>Calls/Hour</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: 14, fontWeight: 600, color: T.muted }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {weeklyData.map((agent, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 500 }}>{agent.name}</td>
                    <td style={{ padding: '16px 20px', fontSize: 14, color: T.muted }}>{agent.team}</td>
                    <td style={{ padding: '16px 20px', fontSize: 14, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
                      {agent.logged.toFixed(1)}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: 14, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
                      {agent.verified.toFixed(1)}
                    </td>
                    <td style={{ 
                      padding: '16px 20px', 
                      fontSize: 14, 
                      textAlign: 'right', 
                      fontFamily: "'JetBrains Mono', monospace",
                      color: agent.callsPerHour < 20 ? T.red : T.text
                    }}>
                      {agent.callsPerHour.toFixed(1)}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: 14 }}>
                      {agent.status === 'flagged' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ 
                            backgroundColor: T.red, 
                            color: T.bg, 
                            padding: '4px 8px', 
                            borderRadius: 4, 
                            fontSize: 12, 
                            fontWeight: 600 
                          }}>
                            FLAGGED
                          </div>
                          <span style={{ color: T.muted, fontSize: 12 }}>{agent.issue}</span>
                        </div>
                      ) : (
                        <div style={{ 
                          backgroundColor: T.green, 
                          color: T.bg, 
                          padding: '4px 8px', 
                          borderRadius: 4, 
                          fontSize: 12, 
                          fontWeight: 600,
                          display: 'inline-block'
                        }}>
                          CLEAN
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Monthly Commissions Tab */}
      {selectedTab === 'monthly' && (
        <div style={{
          backgroundColor: T.surface,
          borderRadius: 8,
          border: `1px solid ${T.border}`,
          overflow: 'hidden'
        }}>
          <div style={{ padding: 20, borderBottom: `1px solid ${T.border}` }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
              December 2023 Commissions
            </h3>
            <p style={{ margin: '4px 0 0 0', color: T.muted, fontSize: 14 }}>
              Tier 1: $10/$100 | Tier 2: $20/$200 | Tier 3: $30/$300
            </p>
          </div>

          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: T.bg }}>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: 14, fontWeight: 600, color: T.muted }}>Agent</th>
                  <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 14, fontWeight: 600, color: T.muted }}>Appointments</th>
                  <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: 14, fontWeight: 600, color: T.muted }}>Tier</th>
                  <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 14, fontWeight: 600, color: T.muted }}>Deals</th>
                  <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 14, fontWeight: 600, color: T.muted }}>Base Commission</th>
                  <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 14, fontWeight: 600, color: T.muted }}>Contest Bonus</th>
                  <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 14, fontWeight: 600, color: T.muted }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {monthlyCommissions.map((agent, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 500 }}>{agent.name}</td>
                    <td style={{ padding: '16px 20px', fontSize: 14, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
                      {agent.appointments}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <div style={{ 
                        backgroundColor: agent.tier === 1 ? T.red : agent.tier === 2 ? T.accent : T.green,
                        color: T.bg, 
                        padding: '4px 8px', 
                        borderRadius: 4, 
                        fontSize: 12, 
                        fontWeight: 600,
                        display: 'inline-block'
                      }}>
                        TIER {agent.tier}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: 14, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
                      {agent.deals}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: 14, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
                      ${agent.commission.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: 14, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", color: agent.contests > 0 ? T.green : T.muted }}>
                      ${agent.contests}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: 14, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: T.green }}>
                      ${(agent.commission + agent.contests).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contest Tracking Tab */}
      {selectedTab === 'contests' && (
        <div style={{
          backgroundColor: T.surface,
          borderRadius: 8,
          border: `1px solid ${T.border}`,
          padding: 20
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600 }}>
            December Contest Leaderboards
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            <div style={{ backgroundColor: T.bg, borderRadius: 6, padding: 16 }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 16, color: T.accent }}>Daily Leader ($20)</h4>
              <div style={{ fontSize: 14, color: T.muted, marginBottom: 8 }}>Today - Dec 16</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>James Brown - 8 appointments</div>
            </div>

            <div style={{ backgroundColor: T.bg, borderRadius: 6, padding: 16 }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 16, color: T.green }}>Team Goal Bonus</h4>
              <div style={{ fontSize: 14, color: T.muted, marginBottom: 8 }}>Tier 2+ agents, team hits 150</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: T.green }}>4 agents qualified</div>
            </div>

            <div style={{ backgroundColor: T.bg, borderRadius: 6, padding: 16 }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 16, color: T.accent }}>Shortest Schedule Gap</h4>
              <div style={{ fontSize: 14, color: T.muted, marginBottom: 8 }}>Avg conversation to appointment</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Sarah Johnson - 2.1 days</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
