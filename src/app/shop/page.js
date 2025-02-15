import { Suspense } from "react";
import ShopPage from "@/components/Shop/ShopPage";

export default function Shop() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ShopPage />
      </Suspense>
    </>
  );
}
