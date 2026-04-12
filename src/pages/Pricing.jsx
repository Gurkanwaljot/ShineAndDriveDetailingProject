import PackageSelector from "../components/Pricing/PackageSelector";

export default function Pricing() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Our Packages</h1>
          <p className="page-hero-subtitle">
            Professional car detailing for every need — select a category to explore our tiers.
          </p>
        </div>
      </div>
      <PackageSelector />
    </>
  );
}
