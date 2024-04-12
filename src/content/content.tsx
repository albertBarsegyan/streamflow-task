import { useStreamFlow } from "../context/stream-flow-context/stream-flow-context.tsx";
import { useEffect } from "react";

export function Content() {
  const {solanaClient} = useStreamFlow()

  useEffect(()=> {
    console.log({solanaClient})
  },[])

  return (
    <div>
      some content
    </div>
  );
}
