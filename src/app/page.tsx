import { Link, Button, Card, CardHeader, CardBody, CardFooter } from "@heroui/react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
      <div className="inline-block max-w-2xl text-center justify-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Finansal Geleceğinize Yön Verin
        </h1>
        <p className="mt-4 text-lg text-default-500">
          En doğru finansal kararları almanız için ihtiyacınız olan tüm araçlar burada. Kredi ve tasarruf hedeflerinizi kolayca planlayın.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl w-full">
        <Card className="p-4">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Kredi Hesaplayıcı</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-600">
              İhtiyaç, konut veya taşıt kredileri için en uygun faiz oranlarını ve ödeme planlarını karşılaştırın. Anında hesaplama yaparak bütçenizi yönetin.
            </p>
          </CardBody>
          <CardFooter>
            <Button
              href="/credit"
              as={Link}
              color="primary"
              variant="solid"
              size="lg"
              className="w-full"
            >
              Kredi Hesapla
            </Button>
          </CardFooter>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Tasarruf Planlayıcı</h2>
          </CardHeader>
          <CardBody>
            <p className="text-default-600">
              Hayallerinizdeki birikime ne kadar sürede ulaşabileceğinizi öğrenin. Aylık ne kadar birikim yapmanız gerektiğini kolayca hesaplayın.
            </p>
          </CardBody>
          <CardFooter>
            <Button
              href="/savings"
              as={Link}
              color="primary"
              variant="ghost"
              size="lg"
              className="w-full"
            >
              Tasarruf Planla
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}