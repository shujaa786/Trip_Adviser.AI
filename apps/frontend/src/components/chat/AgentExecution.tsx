interface Props {
  agentsExecuted: string[];
}

export default function AgentExecution({ agentsExecuted }: Props) {
  return (
    <div
      style={{
        marginTop: 30,
      }}
    >
      <h3>Execution</h3>

      <ul>
        {agentsExecuted.map((agent) => (
          <li key={agent}>✅ {agent}</li>
        ))}
      </ul>
    </div>
  );
}
