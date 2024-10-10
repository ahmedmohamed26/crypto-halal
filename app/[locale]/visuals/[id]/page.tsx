import React from "react";

function VisualDetails({ params }: { params: { id: string } }) {
  return <div>VisualDetails number {params.id}</div>;
}

export default VisualDetails;
