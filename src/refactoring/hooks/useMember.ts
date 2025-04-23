import { useEffect, useState } from "react";
import { Member } from "../../types";

export const initialMember: Member = {
    id: "",
    name: "",
    gradeId: "",
}

export const useMember = (initialMember: Member) => {
    const [member, setMember] = useState<Member>(initialMember);

    useEffect(() => {
      getMember();    
    }, []);

    const getMember = async () => {
      const response = await fetch("/api/member", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });
      
      const data = await response.json();
      setMember(data);
    }
    

    return { member, setMember };
}