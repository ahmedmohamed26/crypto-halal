import dynamic from "next/dynamic";

const Loader = dynamic(() => import("../_components/Loader"));
export default function Loading() {
  return <Loader />;
}
