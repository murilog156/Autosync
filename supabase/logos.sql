-- Logos das procurações (Supabase Storage)
-- Rodar uma vez em: Supabase → SQL Editor → New query → colar tudo → Run
--
-- Cria o bucket privado "logos" (só PNG, até 100 KB) e regras para que cada
-- usuário só consiga ver, enviar, trocar e apagar a própria logo,
-- que fica em "logos/<id do usuário>/logo.png".

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('logos', 'logos', false, 102400, array['image/png'])
on conflict (id) do update
  set public = false,
      file_size_limit = 102400,
      allowed_mime_types = array['image/png'];

create policy "logos: ver a propria"
  on storage.objects for select to authenticated
  using (bucket_id = 'logos' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "logos: enviar a propria"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'logos' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "logos: trocar a propria"
  on storage.objects for update to authenticated
  using (bucket_id = 'logos' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'logos' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "logos: apagar a propria"
  on storage.objects for delete to authenticated
  using (bucket_id = 'logos' and (storage.foldername(name))[1] = (select auth.uid())::text);
