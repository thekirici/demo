import { Link, Button } from "@heroui/react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-4xl font-bold">Finansal Geleceğinizi Şekillendirin</h1>
        <p className="mt-4 text-lg">
          Kredi ve birikim hedeflerinizi planlamak için ihtiyacınız olan modern araçlar burada. Finansta ile finansal kararlarınızı güvenle alın.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          href="/credit"
          as={Link}
          color="primary"
          variant="solid"
          size="lg"
        >
          Kredi Hesaplayıcıya Git
        </Button>
      </div>
    </section>
  );
}