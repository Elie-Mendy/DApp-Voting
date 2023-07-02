import { Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "@/components/generic/NavBar";

export default function MainLayout({children}) {
    return (
        <Grid>
            <GridItem>
                <Navbar />
            </GridItem>
            <GridItem mt={{ base: "11rem", md: "7rem" }}>
                {children}
            </GridItem>
        </Grid>
    )
}
