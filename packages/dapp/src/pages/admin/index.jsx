import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLayout from "@/layouts/AdminLayout";

export default function index() {
    return (
        <AdminLayout>
            <AdminDashboard />
        </AdminLayout>
    );
}
