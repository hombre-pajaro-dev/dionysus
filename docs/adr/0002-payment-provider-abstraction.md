# ADR 0002 — Abstracción de proveedores de pago

## Estado
Aceptado

## Contexto
La plataforma inicia con Stripe (soporte de tarjeta + OXXO en México), pero debe poder integrar proveedores adicionales como MercadoPago u otros sin rediseñar el sistema de pagos.

## Decisión
Implementar una capa de abstracción de pagos (interfaz/adaptador) que desacopla la lógica de negocio (donativos, tokens, comisiones) del proveedor concreto. Stripe es el primer adaptador.

## Consecuencias
- Los conceptos de "Donativo" y "Balance" son del dominio — no de Stripe
- Agregar MercadoPago u otro proveedor requiere un nuevo adaptador, no cambios en la lógica de negocio
- Los webhooks de confirmación de pago pasan por la capa de abstracción antes de afectar el Balance
