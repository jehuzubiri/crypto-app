import { Metadata } from "next";
import { AppConfig } from "@/constant/App.const";

export const metadata: Metadata = {
  title: AppConfig.metaTitle || "Terragon FE",
  description: AppConfig.metaDescription,
};

const HomePage: React.FC<{ data: string }> = ({ data }) => {
  return (
    <section style={{ minHeight: "0" }}>
      <h1>Home Page</h1>
      <p>{`${data} ${1}`}</p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}></div>
    </section>
  );
};

export default HomePage;
