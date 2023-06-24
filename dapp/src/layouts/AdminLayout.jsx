import {
    VotingContractAdminProvider,
    VotingContractContext,
} from "@/providers/VotingContractProvider";
import Router from "next/router";
import { useContext } from "react";

const AdminLayout = ({ children }) => {
    const { isOwner } = useContext(VotingContractContext);

    if (!isOwner) {
        Router.push(`/`);
    }

    return (
        <VotingContractAdminProvider>{isOwner && children}</VotingContractAdminProvider>
    );
};

export default AdminLayout;
