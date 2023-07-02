import {
    VotingContractAdminProvider,
    VotingContractContext,
} from "@/providers/VotingContractProvider";
import Router from "next/router";
import { useContext } from "react";
import MainLayout from "./MainLayout";

const AdminLayout = ({ children }) => {
    const { isOwner } = useContext(VotingContractContext);

    if (!isOwner) {
        Router.push(`/`);
    }

    return (
        <MainLayout>
            <VotingContractAdminProvider>{isOwner && children}</VotingContractAdminProvider>
        </MainLayout>
    );
};

export default AdminLayout;
