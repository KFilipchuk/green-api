declare const whatsAppClient: {
    restAPI: (opt: any) => ({message: any, webhookService: any}),
    webhookAPI: () => void
}
