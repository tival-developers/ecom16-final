 'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start  bg-gradient-to-br from-yellow-50 to-white  px-4 py-10 md:px-8 lg:px-20">
      <Card className="w-full max-w-5xl shadow-xl px-3.5 bg-slate-50">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center text-yellow-600">
            Terms & Conditions
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <ScrollArea className="h-[70vh] pr-4">
            <div className="space-y-8 text-sm md:text-base leading-relaxed text-muted-foreground">
              <section>
                <h2 className="font-semibold text-primary mb-2">1. Introduction</h2>
                <p>
                  Welcome to our online store. By accessing or using our website and placing orders, you agree to comply with
                  and be bound by the following Terms and Conditions. Please read them carefully before using our services.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-primary mb-2">2. Account Registration</h2>
                <p>
                  To place orders, you may be required to register for an account. You agree to provide accurate, current, and
                  complete information and to update it as necessary. You are responsible for keeping your login credentials secure.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-primary mb-2">3. Product Information</h2>
                <p>
                  We strive to provide accurate descriptions and images of products. However, colors, packaging, or minor details may
                  differ slightly due to manufacturing or screen differences. We reserve the right to correct errors at any time.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-primary mb-2">4. Pricing and Payment</h2>
                <p>
                  All prices are listed in your local currency and include applicable taxes unless otherwise stated. We accept
                  various forms of payment including credit/debit cards, mobile money, and cash on delivery (COD) where applicable.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-primary mb-2">5. Order Processing</h2>
                <p>
                  Orders are processed within 1–2 business days. You will receive an order confirmation via email. We reserve
                  the right to cancel or limit quantities on any order for any reason, including suspected fraud or stock issues.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-primary mb-2">6. Shipping & Delivery</h2>
                <p>
                  Delivery timelines vary based on your location and the chosen shipping method. We are not responsible for delays
                  due to courier issues, weather, or incorrect shipping information provided by the user.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-primary mb-2">7. Returns & Refunds</h2>
                <p>
                  You may return products within 7 days of receipt, provided they are unused and in original packaging. Refunds will
                  be issued to the original payment method. Certain items (e.g., perishable goods, undergarments) may not be eligible for return.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-primary mb-2">8. User Conduct</h2>
                <p>
                  You agree not to misuse the website, submit false orders, or use automated tools to interfere with our services.
                  Any fraudulent activity will result in account termination and possible legal action.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-primary mb-2">9. Limitation of Liability</h2>
                <p>
                  Our liability is limited to the value of the products purchased. We are not liable for indirect damages or losses
                  resulting from the use or inability to use our site or products.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-primary mb-2">10. Changes to Terms</h2>
                <p>
                  We may update these Terms at any time without prior notice. Your continued use of the site after changes
                  constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-primary mb-2">11. Contact Information</h2>
                <p>
                  For questions regarding these Terms, please contact us at{' '}
                  <a href="mailto:support@yourshop.com" className="text-blue-600 underline">
                    support@yourshop.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
